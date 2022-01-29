/**
 * @jest-environment node
 */
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import client from 'firebase-tools';
import * as controller from 'firebase-tools/lib/emulator/controller';
import { doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';
import config from '../../firebase.json';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  client.emulators.start({
    only: 'firestore',
    config: 'firebase.json',
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  testEnv = await initializeTestEnvironment({
    projectId: 'time-is-gold',
    firestore: {
      rules: readFileSync(join(__dirname, 'firestore.rules'), 'utf8'),
      host: config.emulators.firestore.host ?? 'localhost',
      port: parseInt(config.emulators.firestore.port, 10) ?? 8080,
    },
  });
});

afterAll(async () => {
  await controller.cleanShutdown();
});

afterEach(async () => {
  await testEnv?.clearFirestore();
});

describe('firestore rules', () => {
  describe('users', () => {
    it('should reject payout creation if not authenticated', async () => {
      const ctx = testEnv.unauthenticatedContext();
      const ref = doc(ctx.firestore(), 'users', '1', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp() });

      await assertFails(p);
    });

    it('should reject payout creation if authenticated but not as the user', async () => {
      const ctx = testEnv.authenticatedContext('1');
      const ref = doc(ctx.firestore(), 'users', '2', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp() });

      await assertFails(p);
    });

    it('should reject payout creation if timestamp is illegal', async () => {
      const ctx = testEnv.authenticatedContext('3');
      const ref = doc(ctx.firestore(), 'users', '3', 'private', 'payout');

      const p = setDoc(ref, { timestamp: Timestamp.now() });

      await assertFails(p);
    });

    it('should pass payout creation if authenticated as the user', async () => {
      const ctx = testEnv.authenticatedContext('3');
      const ref = doc(ctx.firestore(), 'users', '3', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp() });

      await assertSucceeds(p);
    });

    it('should reject payout update if not authenticated', async () => {
      const ctx1 = testEnv.authenticatedContext('1');
      const ctx2 = testEnv.unauthenticatedContext();
      const ref1 = doc(ctx1.firestore(), 'users', '1', 'private', 'payout');
      const ref2 = doc(ctx2.firestore(), 'users', '1', 'private', 'payout');
      await setDoc(ref1, { timestamp: serverTimestamp() });

      const p = setDoc(ref2, { timestamp: serverTimestamp() });

      await assertFails(p);
    });

    it('should reject payout update if authenticated but not as the user', async () => {
      const ctx1 = testEnv.authenticatedContext('1');
      const ctx2 = testEnv.authenticatedContext('2');
      const ref1 = doc(ctx1.firestore(), 'users', '1', 'private', 'payout');
      const ref2 = doc(ctx2.firestore(), 'users', '1', 'private', 'payout');
      await setDoc(ref1, { timestamp: serverTimestamp() });

      const p = setDoc(ref2, { timestamp: serverTimestamp() });

      await assertFails(p);
    });

    it('should reject payout update if too soon to update', async () => {
      const ctx = testEnv.authenticatedContext('3');
      const ref = doc(ctx.firestore(), 'users', '3', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp() });
      await new Promise(resolve => setTimeout(resolve, 4_500));

      const p = setDoc(ref, { timestamp: serverTimestamp() });

      await assertFails(p);
    });

    it('should reject payout update if timestamp is illegal', async () => {
      const ctx = testEnv.authenticatedContext('3');
      const ref = doc(ctx.firestore(), 'users', '3', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp() });
      await new Promise(resolve => setTimeout(resolve, 5_500));

      const p = setDoc(ref, { timestamp: Timestamp.now() });

      await assertFails(p);
    }, 10_000);

    it('should pass payout update if late enough to update', async () => {
      const ctx = testEnv.authenticatedContext('3');
      const ref = doc(ctx.firestore(), 'users', '3', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp() });
      await new Promise(resolve => setTimeout(resolve, 5_500));

      const p = setDoc(ref, { timestamp: serverTimestamp() });

      await assertSucceeds(p);
    }, 10_000);
  });
});

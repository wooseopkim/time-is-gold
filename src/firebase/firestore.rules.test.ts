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
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
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

describe('firestore rules', () => {
  beforeEach(async () => {
    const ctx = testEnv.authenticatedContext('alice');
    await setDoc(doc(ctx.firestore(), 'users', 'alice'), {});
  });

  afterEach(async () => {
    await testEnv?.clearFirestore();
  });

  describe('status', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async ctx => {
        await setDoc(doc(ctx.firestore(), 'users', 'admin'), { admin: true });
      });
    });

    it('should reject read if not authenticated', async () => {
      const ctx = testEnv.unauthenticatedContext();
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = getDoc(ref);

      await assertFails(p);
    });

    it('should reject read if authentiacted but not as the user', async () => {
      const ctx = testEnv.authenticatedContext('bob');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = getDoc(ref);

      await assertFails(p);
    });

    it('should allow read if authenticated as the user', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = getDoc(ref);

      await assertSucceeds(p);
    });

    it('should reject write if not authenticated', async () => {
      const ctx = testEnv.unauthenticatedContext();
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = setDoc(ref, {});

      await assertFails(p);
    });

    it('should reject write even if authenticated as the user', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = setDoc(ref, {});

      await assertFails(p);
    });

    it('should allow write if authenticated as admin', async () => {
      const ctx = testEnv.authenticatedContext('admin');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = setDoc(ref, {});

      await assertSucceeds(p);
    });

    it('should reject write if requesting to be admin', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'status');

      const p = setDoc(ref, { admin: true });

      await assertFails(p);
    });
  });

  describe('payouts', () => {
    it('should reject payout creation if not authenticated', async () => {
      const ctx = testEnv.unauthenticatedContext();
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });

      await assertFails(p);
    });

    it('should reject payout creation if authenticated but not as the user', async () => {
      const ctx = testEnv.authenticatedContext('bob');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });

      await assertFails(p);
    });

    it('should reject payout creation if requesting more than legal', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');

      const p = setDoc(ref, { timestamp: Timestamp.now(), amount: 1 });

      await assertFails(p);
    });

    it('should pass payout creation if everything is ok', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');

      const p = setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });

      await assertSucceeds(p);
    });

    it('should reject payout update if not authenticated', async () => {
      const ctx1 = testEnv.authenticatedContext('alice');
      const ctx2 = testEnv.unauthenticatedContext();
      const ref1 = doc(ctx1.firestore(), 'users', 'alice', 'private', 'payout');
      const ref2 = doc(ctx2.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref1, { timestamp: serverTimestamp(), amount: 1 });

      const p = updateDoc(ref2, { timestamp: serverTimestamp(), amount: 1 });

      await assertFails(p);
    });

    it('should reject payout update if authenticated but not as the user', async () => {
      const ctx1 = testEnv.authenticatedContext('alice');
      const ctx2 = testEnv.authenticatedContext('bob');
      const ref1 = doc(ctx1.firestore(), 'users', 'alice', 'private', 'payout');
      const ref2 = doc(ctx2.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref1, { timestamp: serverTimestamp(), amount: 1 });

      const p = updateDoc(ref2, { timestamp: serverTimestamp(), amount: 1 });

      await assertFails(p);
    });

    it('should reject payout update if requesting more than legal', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });

      const p = updateDoc(ref, { timestamp: serverTimestamp(), amount: 1000 });

      await assertFails(p);
    });

    it('should reject payout update if timestamp is illegal', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });
      await new Promise(resolve => setTimeout(resolve, 1500));

      const p = updateDoc(ref, { timestamp: Timestamp.now(), amount: 1 });

      await assertFails(p);
    });

    it('should pass payout update if everything is ok', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });
      await new Promise(resolve => setTimeout(resolve, 1500));

      const p = updateDoc(ref, { timestamp: serverTimestamp(), amount: 1000 });

      await assertSucceeds(p);
    });

    it('should respect user status values', async () => {
      const ctx = testEnv.authenticatedContext('alice');
      const ref = doc(ctx.firestore(), 'users', 'alice', 'private', 'payout');
      await setDoc(ref, { timestamp: serverTimestamp(), amount: 1 });
      await testEnv.withSecurityRulesDisabled(async c => {
        await setDoc(
          doc(c.firestore(), 'users', 'alice', 'private', 'status'),
          {
            payoutPerSecond: 5678,
            multiplier: 1.5,
          },
        );
      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      const p = updateDoc(ref, {
        timestamp: serverTimestamp(),
        amount: Math.floor(5678 * 1.5),
      });

      await assertSucceeds(p);
    });
  });
});

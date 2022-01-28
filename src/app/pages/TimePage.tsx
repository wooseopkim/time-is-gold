import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  clearTransactionIOS,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  initConnection,
  Product,
  requestPurchase,
} from 'react-native-iap';
import { useTranslator } from '../i18n/hooks';
import { Body, Heading } from '../primitives/typography';
import PageContainer from './PageContainer';

const skus = ['2x_multiplier', '5x_multiplier', '10x_multiplier'];

export default function TimePage() {
  const translate = useTranslator();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      await initConnection();
      const fetched = await getProducts(skus);
      setProducts(fetched);
    })();
    return () => {
      endConnection();
    };
  }, []);

  const onPurchase = useCallback(async (x: Product) => {
    switch (Platform.OS) {
      case 'android':
        await flushFailedPurchasesCachedAsPendingAndroid();
        break;
      case 'ios':
        await clearTransactionIOS();
        break;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await requestPurchase(x.productId);
    // TODO handle result
  }, []);

  return (
    <PageContainer>
      <Heading>{translate('goldIsTime')}</Heading>
      {products
        ?.sort((a, b) => skus.indexOf(a.productId) - skus.indexOf(b.productId))
        ?.map(x => (
          <Body key={x.productId} onPress={() => onPurchase(x)}>
            <Body>
              {x.title.replace(/\s+(\(.+\))$/, '')} ({x.localizedPrice})
            </Body>
          </Body>
        ))}
    </PageContainer>
  );
}

import React, { useCallback, useMemo } from 'react';
import { ModalProps, ScrollView, StyleSheet, View } from 'react-native';
import useUserDefinedColorScheme from '../../colorScheme/hooks';
import { useLocale } from '../../i18n/hooks';
import { locales } from '../../i18n/locales';
import { LocaleCode } from '../../i18n/types';
import FloatingModal from '../../primitives/FloatingModal';
import { Body } from '../../primitives/typography';
import { pixelUnit } from '../../responsiveness';

export default function LanguageModal(props: ModalProps) {
  const { onLocaleChange } = useLocale();
  const { colorScheme } = useUserDefinedColorScheme();

  const onSelect = useCallback((code: LocaleCode) => {
    onLocaleChange(code);
    props.onRequestClose?.();
  }, []);
  const styles = useMemo(
    () => createStyles(colorScheme === 'dark'),
    [colorScheme],
  );

  return (
    <FloatingModal {...props}>
      <ScrollView
        contentContainerStyle={{}}
        onResponderRelease={props?.onRequestClose}>
        <View style={styles.content}>
          {Object.entries(locales).map(([code, locale]) => (
            <Body key={code} onPress={() => onSelect(code as LocaleCode)}>
              {locale.meta.readableName}
            </Body>
          ))}
        </View>
      </ScrollView>
    </FloatingModal>
  );
}

function createStyles(isDarkMode: boolean) {
  return StyleSheet.create({
    dimmer: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      margin: 20 * pixelUnit,
    },
  });
}

import React from 'react';
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

export default function FloatingModal({
  children,
  style: passedStyle,
  ...rest
}: ModalProps) {
  const composedStyle = StyleSheet.compose<ViewStyle>(
    styles.dimmer,
    passedStyle,
  );

  return (
    <Modal {...rest}>
      <TouchableWithoutFeedback onPress={rest?.onRequestClose}>
        <View style={composedStyle}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dimmer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

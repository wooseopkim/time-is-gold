import React from 'react';
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function FloatingModal({
  children,
  style: passedStyle,
  ...rest
}: ModalProps) {
  return (
    <Modal {...rest}>
      <TouchableWithoutFeedback onPress={rest?.onRequestClose}>
        <View style={styles.dimmer} onResponderRelease={console.log}>
          {children}
        </View>
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

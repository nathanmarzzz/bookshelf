import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  width: number;
  height: number;
  img_url: string;
};

export const ImageContainer = ({ width, height, img_url }: Props) => {
  return img_url ? (
    <Image
      source={{ uri: img_url }}
      style={[styles.img, { width: width, height: height }]}
    />
  ) : (
    <View style={[styles.noImgContainer, { height: height }]}>
      <Text style={styles.noImg}>?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
  },
  noImgContainer: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    left: 8,
  },
  noImg: {
    color: 'white',
    justifyContent: 'center',
    fontWeight: '600',
    textAlign: 'center',
  },
});

import React, {useState} from 'react'
import FastImage from 'react-native-fast-image'
import {Loader} from './Loader'
import styled from 'styled-components/native'

interface Props {
  uri: string
  height: number
  width: number
}
export const ImageView: React.FC<Props> = ({height, width, uri}) => {
  const [isLoading, setLoading] = useState(true)

  function onLoadStart() {
    setLoading(true)
  }

  function onLoadEnd() {
    setLoading(false)
  }

  return (
    <>
      <FastImage
        onLoadEnd={onLoadEnd}
        onLoadStart={onLoadStart}
        style={{width: width, height: height}}
        source={{
          uri: uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LoaderContainer>
        <Loader loading={isLoading} size="small" />
      </LoaderContainer>
    </>
  )
}

const LoaderContainer = styled.View`
  position: absolute;
`

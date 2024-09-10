import React from 'react'
import styled from 'styled-components/native'
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native'

interface LoaderProps {
  loading: boolean
  size: ActivityIndicatorProps['size']
}

export const Loader: React.FC<LoaderProps> = ({loading, size}) => {
  if (!loading) {
    return null
  }

  return (
    <LoaderContainer>
      <ActivityIndicator size={size} />
    </LoaderContainer>
  )
}

const LoaderContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-color: #ced0ce;
`

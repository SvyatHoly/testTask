import React, {FC, memo, useCallback} from 'react'
import styled from 'styled-components/native'

import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../../../App'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {ImageView} from '../../shared/ImageView'
import {ViewProps} from 'react-native'
import {Character} from '../../services/models'

interface Props {
  item: Character
}

type ListingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListingScreen'
>

export const ListCell: FC<Props> = memo(({item}) => {
  const navigation = useNavigation<ListingScreenNavigationProp>()
  const {image, name, status, origin} = item

  const goToDetails = useCallback(() => {
    navigation.navigate('DetailScreen', {
      data: item,
    })
  }, [navigation, item])

  return (
    <StyledTouchableOpacity
      testID={`cellId-${item.id}`}
      onPress={goToDetails}
      accessibilityLabel={`Character ${name}, status: ${status}, origin: ${origin.name}`}>
      <ImageView uri={image} height={50} width={50} />
      <InfoContainer>
        <NameText>{name}</NameText>
        <DetailText>origin: {origin.name}</DetailText>
      </InfoContainer>
      <StatusIndicator status={status} />
    </StyledTouchableOpacity>
  )
})

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  gap: 10px;
`

const InfoContainer = styled.View`
  flex: 1;
`

const NameText = styled.Text`
  font-weight: bold;
`

const DetailText = styled.Text`
  color: #555;
`

type CharacterStatus = 'Dead' | 'Alive' | 'unknown'

interface StatusIndicatorProps extends ViewProps {
  status: CharacterStatus
}

const StatusIndicator = styled.View<StatusIndicatorProps>`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${({status}) => {
    switch (status) {
      case 'Alive':
        return 'green'
      case 'Dead':
        return 'red'
      default:
        return 'gray'
    }
  }};
`

export default ListCell

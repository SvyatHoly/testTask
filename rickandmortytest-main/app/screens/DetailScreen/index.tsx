import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'
import styled from 'styled-components/native'
import {RootStackParamList} from '../../../App'
import {ImageView} from '../../shared/ImageView'
import {Character} from '../../services/models'

const BasicInfoContent = ({character}: {character: Character}) => (
  <ContentContainer>
    <Header>Basic Information</Header>
    <ImageViewContainer>
      <ImageView uri={character.image} height={300} width={300} />
    </ImageViewContainer>
    <Separator />
    <Section>
      <Label>name:</Label>
      <Value testID="name">{character.name}</Value>
    </Section>
    <Section>
      <Label>origin:</Label>
      <Value testID="origin">{character.origin.name}</Value>
    </Section>
    <Section>
      <Label>gender:</Label>
      <Value testID="gender">{character.gender}</Value>
    </Section>
    <Section>
      <Label>location:</Label>
      <Value testID="location">{character.location.name}</Value>
    </Section>
    <Section>
      <Label>status:</Label>
      <ExecutionStatus testID="status" status={character.status}>
        {character.status}
      </ExecutionStatus>
    </Section>
  </ContentContainer>
)

const EpisodesContent = ({episodes}: {episodes: string[]}) => (
  <ContentContainer>
    <Header>Episodes</Header>
    <Text>{JSON.stringify(episodes, null, 2)}</Text>
  </ContentContainer>
)

export const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>()
  const character = route.params.data
  const [activeTab, setActiveTab] = useState<'basic' | 'episodes'>('basic')

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <ScrollView>
          {activeTab === 'basic' ? (
            <BasicInfoContent character={character} />
          ) : (
            <EpisodesContent episodes={character.episode} />
          )}
        </ScrollView>
        <TabContainer>
          <TabButton
            active={activeTab === 'basic'}
            onPress={() => setActiveTab('basic')}>
            <TabText active={activeTab === 'basic'}>Basic Info</TabText>
          </TabButton>
          <TabButton
            active={activeTab === 'episodes'}
            onPress={() => setActiveTab('episodes')}>
            <TabText active={activeTab === 'episodes'}>Episodes</TabText>
          </TabButton>
        </TabContainer>
      </Container>
    </SafeAreaView>
  )
}

const Container = styled.View`
  flex: 1;
`

const ContentContainer = styled.ScrollView`
  padding: 20px;
`

const ImageViewContainer = styled.View`
  justify-content: center;
  align-items: center;
`

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  align-items: center;
`

const Label = styled.Text`
  font-weight: bold;
  margin-right: 10px;
  color: #444;
  width: 80px;
`

const Value = styled(Label)`
  flex: 2;
  color: #666;
`

interface StatusIndicatorProps {
  status: 'Dead' | 'Alive' | 'unknown'
}

const ExecutionStatus = styled(Text)<StatusIndicatorProps>`
  flex: 2;
  color: ${({status}) => {
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

const Separator = styled.View`
  height: 1px;
  background-color: black;
  margin: 20px 0px;
`

const TabContainer = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #ccc;
`

const TabButton = styled(TouchableOpacity)<{active: boolean}>`
  flex: 1;
  padding: 10px;
  background-color: ${props => (props.active ? '#e0e0e0' : 'white')};
  align-items: center;
`

const TabText = styled.Text<{active: boolean}>`
  color: ${props => (props.active ? 'blue' : 'black')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`

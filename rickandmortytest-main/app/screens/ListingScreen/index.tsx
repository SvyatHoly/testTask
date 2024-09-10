import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {FlashList} from '@shopify/flash-list'
import {Loader} from '../../shared/Loader'
import {ListCell} from './ListCell'
import styled from 'styled-components/native'
import {ListRenderItemInfo} from '@shopify/flash-list'
import {Alert} from 'react-native'
import {isValidError} from '../../utils/isValidError'

import {fetchCharacters} from '../../services/api'
import {Character} from '../../services/models'

const keyExtractor = (item: Character) => `key-${item.id}`

export const ListingScreen = () => {
  const [data, setData] = useState<Character[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(async (nextPage: number) => {
    setLoading(true)

    try {
      const response = await fetchCharacters(nextPage)

      if (response && response.info && response.results) {
        setData(prev => [...prev, ...response.results])
        const {pages} = response.info
        setHasMore(pages > nextPage)
        setPage(nextPage)
      }
    } catch (error) {
      const errorMessage = isValidError(error)
        ? error.message
        : 'An unknown error occurred'
      Alert.alert('Error', errorMessage)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCharacters(1)
  }, [fetch])

  const loadMoreData = useCallback(() => {
    if (!loading && hasMore) {
      fetch(page + 1)
    }
  }, [fetch, hasMore, loading, page])

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Character>) => <ListCell item={item} />,
    [],
  )

  const ListFooter = useMemo(() => {
    return <Loader loading={loading} size={'large'} />
  }, [loading])

  return (
    <Container>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={71}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={ListFooter}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

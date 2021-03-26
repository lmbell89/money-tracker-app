import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-paper'

const Item = ({ id, name, value, period, deleteFn }) => {
  return (
    <Card key={id}>
      <Card.Title
        left={(name) => <Text>{name}</Text>}
        right={(value) > <Text>{`£${value.toFixed(2)}`}</Text>}
        subtitle={period || null}
      />
      <Card.Actions>
        <Button onPress={() => deleteFn(id)}>
          Edit
        </Button>
        <Button onPress={() => deleteFn(id)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}

export default Item
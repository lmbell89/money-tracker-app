import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-paper'

const Item = ({ 
  id, 
  name, 
  value, 
  date, 
  period, 
  type,
  deleteFn, 
  navigation 
}) => {

  const editItem = () => navigation.navigate("Add", {
    id,
    defaultName: name,
    defaultValue: value.toString(),
    defaultDate: date,
    defaultPeriod: period,
    type
  })

  return (
    <Card key={id} style={styles.card}>
      <Card.Title 
        title={name}
        right={() => <Text>{`£${parseFloat(value).toFixed(2)}`}</Text>}
        subtitle={period || ""}
      />
      <Card.Actions>
        <Button onPress={editItem}>
          Edit
        </Button>
        <Button onPress={() => deleteFn(id)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    paddingRight: 10
  }
})

export default Item
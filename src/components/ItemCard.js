import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

const ItemCard = ({ item, deleteItem }) => {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader 
          action={
            <IconButton onClick={() => deleteItem(item.id)}>
                
            </IconButton>
          }
          title={item.name}
          subheader={"$" + item.price}
        />
      </Card>
    </div>
  )
}

export default ItemCard;
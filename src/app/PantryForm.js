import { Button, TextField, Stack } from "@mui/material";
import { collection, addDoc } from 'firebase/firestore';
import {db} from './firebase';
import React, { useState } from 'react';
import Box from '@mui/material/Box';

const PantryForm = () => {
  
  const [pantryItem, setPantryItem] = useState({name:'', price: ''})
  
  // Add an item
  const addItem = async (e) => {
    e.preventDefault();
    if (pantryItem.name !== '' && pantryItem.price !== '') {
        await addDoc(collection(db, 'items'), {
          name: pantryItem.name.trim(),
          price: pantryItem.price,
          id: crypto.randomUUID(),
        });
        setPantryItem({name: '', price: ''});
    }
  }

  return (
    <Stack spacing={2} justifyItems="center" style={{ marginTop: '20px' }}> 
        <TextField fullWidth label="item" margin="normal" value={pantryItem.name} onChange={e => setPantryItem({...pantryItem, name: e.target.value})}/>
        <TextField fullWidth label="price" margin="normal" multiline maxRows={4} value={pantryItem.price} onChange={e => setPantryItem({...pantryItem, price: e.target.value})}/>
        <Button onClick={addItem} variant="contained">+</Button>
    </Stack>
  )
}

export default PantryForm;
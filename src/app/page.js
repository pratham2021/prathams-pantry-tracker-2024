'use client'
import React, {useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ItemCard from '../components/ItemCard';
import PantryForm from './PantryForm.js';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Typography } from '@mui/material/Typography';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar'; 

export default function Home() {

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = [];
  
      querySnapshot.forEach((doc) => {
          itemsArray.push({...doc.data(), id: doc.id});
      });
  
      setItems(itemsArray);
  
      // Read total from itemsArray
      const calculateTotal = () => {
        const totalPrice = itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice);
      }
      calculateTotal();
      return () => unsubscribe();
    });
  }, [])

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  } 

  return (
    <Container align='center' style={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ flexGrow: 1 }} align='center'>
          Welcome to Pratham's Pantry
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }} align='center' style={{ marginTop: '5px' }}>
          Get started by adding an item
      </Typography>
      <PantryForm/>

      <Grid container spacing={5} style={{ padding: 30 }}>
          {items.map((item) => (
              <Grid item key={item.id}>
                <ItemCard item={item} deleteItem={deleteItem}/>
              </Grid>
          ))}
      </Grid>
    </Container>
  );
}
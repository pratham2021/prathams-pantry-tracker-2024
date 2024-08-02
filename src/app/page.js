'use client'
import React, {useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ItemCard from '../components/ItemCard';
import PantryForm from './PantryForm.js';
import { collection, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';



export default function Home() {

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  const canBeConvertedToInteger = (value) => {
    const trimmedValue = value.trim();
    const parsedValue = parseFloat(trimmedValue);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleSearchQueryChange = async (event) => {
    setSearchQuery(event.target.value);

    if (searchQuery.trim() === '') {
      setSearchItems([]);
      return;
    }

    try {
      let q;
      let searchItemsArray = [];

      if (canBeConvertedToInteger(searchQuery)) {
        const numberQuery = parseInt(searchQuery, 10);
        q = query(collection(db, 'items'), where('price', '==', numberQuery));
      }
      else {
        q = query(collection(db, 'items'), where('name', '==', searchQuery));
      }

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
          searchItemsArray.push({...doc.data(), id: doc.id})
      })
      
      let shuffledArray = shuffleArray(searchItemsArray.slice());
      setSearchItems(shuffledArray);
    }
    catch (error) {
      console.error('Error fetching documents: ', error)
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
        setSearchItems([]);
        return;
    }

    try {
      let q;
      let searchItemsArray = [];

      if (canBeConvertedToInteger(searchQuery)) {
        const numberQuery = parseInt(searchQuery, 10);
        q = query(collection(db, 'items'), where('price', '==', searchQuery));
      }
      else {
        q = query(collection(db, 'items'), where('name', '==', searchQuery));
      }

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
          searchItemsArray.push({...doc.data(), id: doc.id})
      })
      
      let shuffledArray = shuffleArray(searchItemsArray.slice());
      setSearchItems(shuffledArray);
    }
    catch (error) {
      console.error('Error fetching documents: ', error)
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = [];
  
      querySnapshot.forEach((doc) => {
          itemsArray.push({...doc.data(), id: doc.id});
      });

      let shuffledItems = shuffleArray(itemsArray.slice());
      setItems(shuffledItems);
  
      // Read total from itemsArray
      return () => unsubscribe();
    });
  }, [])

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  } 

  return (
    <Container align='center' style={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ flexGrow: 1 }} align='center'>
          Welcome to Pratham&apos;s Pantry
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }} align='center' style={{ marginTop: '5px' }}>
          Get started by adding an item
      </Typography>
      <PantryForm/>
      <div style={{ padding: '20px' }}>
        <SearchBar value={searchQuery} onChange={handleSearchQueryChange} onSearch={handleSearch}/>
      </div>
      <Grid container spacing={5} style={{ padding: 30 }}>
          {searchItems.length == 0 ? (
              items.map((item) => (
                  <Grid item key={item.id}>
                      <ItemCard item={item} deleteItem={deleteItem}/>
                  </Grid>
              ))
          ) : (
            searchItems.map((searchItem) => (
              <Grid item key={searchItem.id}>
                <ItemCard item={searchItem} deleteItem={deleteItem}/>
              </Grid>
            ))
          )}
      </Grid>
    </Container>
  );
}


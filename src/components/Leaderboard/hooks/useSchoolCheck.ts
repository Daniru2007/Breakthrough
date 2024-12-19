import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '/src/lib/firebase';

// Rest of the file remains the same
import { useEffect, useState } from 'react';
import { firestore } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  sizes: any;
  type(type: any): unknown;
  id: string;
  img: string;
  name: string;
  price: number;
}

const useProducts = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        const productsArray = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProductsList(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { productsList, loading };
};

export default useProducts;

import { useEffect, useState } from 'react';
import { firestore } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Comment } from '@/types/product.ds';

const useComments = () => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'comments');
        const productsSnapshot = await getDocs(productsCollection);

        const productsArray = productsSnapshot.docs.map(doc => ({
          ...doc.data(),
        })) as Comment[];

        setCommentsList(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { commentsList, loading };
};

export default useComments;
import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);
  // const isFocused = useIsFocused();

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      try {
        const { data } = await api.get<Food[]>('orders');

        setOrders(
          data.map(food => ({
            ...food,
            formattedPrice: formatValue(food.price),
          })),
        );
      } catch (error) {
        Alert.alert('Inconsistência', 'Não foi possível carregar seus pedidos');
      }
    }

    loadOrders();
  }, []);
  // }, [isFocused]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedPrice}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;

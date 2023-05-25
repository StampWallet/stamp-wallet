import CardInfo from './CardInfoScreen';
import { benefits } from './CardInfoMockData';

export default function CardInfoScreen({ navigation }) {
  const mockData = benefits;

  return <CardInfo navigation={navigation} benefits={mockData} />;
}

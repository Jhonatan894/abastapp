/*só redireciona*/
/*Decide para onde o usuário vai primeiro*/

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/intro" />;
}

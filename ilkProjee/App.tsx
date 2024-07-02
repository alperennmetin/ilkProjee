import React, {useState} from 'react'; // React ve useState hook'unu import ediyoruz
import {
  SafeAreaView, // Uygulamanın içeriğini güvenli bir şekilde göstermeyi sağlar
  TextInput, // Kullanıcıdan metin girişi almak için kullanılan component
  Button, // buton componenti
  Alert, // Kullanıcıya uyarı mesajları göstermek için kullanılan component
  Text, // Metin göstermek için kullanılan bileşen
  View, // Diğer bileşenleri sarmalamak ve düzenlemek için kullanılan component
  StyleSheet, // Stiller oluşturmak için kullanılan API
} from 'react-native';
import {isValidEmailFormat, isEmailTaken} from 'validatorhw-alp'; // Email doğrulama fonksiyonlarını içeren npm paketinden fonksiyonları import ediyoruz

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1, // Container'ın tüm ekranı kaplamasını sağlar
    justifyContent: 'center', // Dikeyde ortalar
    alignItems: 'center', // Yatayda ortalar
  },
  input: {
    height: 40, // Yüksekliği 40 birim
    borderColor: 'gray', // Kenar rengi gri
    borderWidth: 1, // Kenar genişliği 1 birim
    marginBottom: 20, // Alt boşluk 20 birim
    width: '80%', // Genişlik ekranın %80'i
    paddingHorizontal: 10, // Yatay iç boşluk 10 birim
  },
  buttonContainer: {
    marginTop: 20, // Üst boşluk 20 birim
  },
});

const App = () => {
  // email ve email geçerliliği durumunu tutmak için state tanımlamaları
  const [email, setEmail] = useState(''); // Kullanıcının girdiği email değerini tutar
  const [emailValid, setEmailValid] = useState<boolean | null>(null); // Email geçerliliği durumunu tutar

  // Email doğrulama fonksiyonu
  const validateEmail = async () => {
    // Email formatı geçerli mi kontrolü
    if (isValidEmailFormat(email)) {
      // Email zaten alınmış mı kontrolü
      const taken = await isEmailTaken(email);
      if (taken) {
        setEmailValid(false); // Email alınmışsa geçersiz olarak ayarla
        Alert.alert('Email', 'Bu email zaten alınmış.'); // Uyarı göster
      } else {
        setEmailValid(true); // Email alınmamışsa geçerli olarak ayarla
        Alert.alert('Email', 'Email geçerli ve kullanılabilir.'); // Uyarı göster
      }
    } else {
      setEmailValid(false); // Email formatı geçersizse geçersiz olarak ayarla
      Alert.alert('Email', 'Email formatı geçerli değil.'); // Uyarı göster
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Email girişi için TextInput bileşeni */}
      <TextInput
        style={styles.input} // Stil uygulaması
        placeholder="Email adresinizi girin" // Kullanıcıya bilgi veren metin
        onChangeText={text => setEmail(text)} // Kullanıcı metin girdiğinde email state'ini günceller
        value={email} // TextInput'un değerini email state'ine bağlar
      />
      {/* Email doğrulama için Button componenti */}
      <Button title="Email Doğrula" onPress={validateEmail} />{' '}
      {/* Butona tıklanınca validateEmail fonksiyonunu çalıştırır */}
      {/* Email geçerliliği durumunu gösteren Text componenti */}
      {emailValid !== null && ( // emailValid değeri null değilse göster
        <View style={styles.buttonContainer}>
          <Text>Email geçerliliği: {emailValid ? 'Geçerli' : 'Geçersiz'}</Text>{' '}
          {/* Email geçerli mi geçersiz mi göster */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default App; // App bileşenini dışa aktar

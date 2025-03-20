import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const OnboardingScreen =({navigation}) =>{
    const swiperRef = useRef(null);
    return(
<Swiper 
ref={swiperRef}
loop={false}
dot={<View style={Styles.dot} />}
activeDot={<View style={Styles.activeDot} />}
>
    {/*Slide 1*/}
    <View style={Styles.slide}>
        <Text style={Styles.logo}>Expense EZ Logo</Text>
        <Text style={Styles.title}>Welcome!</Text>
        <Text style={Styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <View style={Styles.buttonContainer}>
       <TouchableOpacity style={Styles.skipButton} onPress={() => navigation.navigate('Login')}>
        <Text style={Styles.skipText}>Skip</Text>
       </TouchableOpacity>
       <TouchableOpacity style={Styles.nextButton} onPress={() => swiperRef.current.scrollBy(1)}>
        <Text style={Styles.nextText}>Next</Text>
       </TouchableOpacity>
       </View>
        </View>
    {/* Slide 2 */}
    <View style={Styles.slide}>
        {/*<Image
          source={{ uri: "https://your-image-url.com/income-expenses.png" }}
          style={Styles.image}
        />*/}
        <Text style={Styles.title}>Manage Expense</Text>
        <Text style={Styles.content}>Keep track of your income and expenses.</Text>
        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.skipButton} onPress={() => navigation.navigate("Login")}>
            <Text style={Styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.nextButton} onPress={() => swiperRef.current.scrollBy(1)} >
            <Text style={Styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide 3 */}
      <View style={Styles.slide}>
        {/*<Image
          source={{ uri: "https://your-image-url.com/claims.png" }}
          style={Styles.image}
        />*/}
        <Text style={Styles.title}>Choose Claims</Text>
        <Text style={Styles.content}>Easily manage your claims and insurance forms.</Text>
        <TouchableOpacity style={Styles.getStartedButton} onPress={() => navigation.navigate("Login")} >
          <Text style={Styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
      </View>

</Swiper>
)
}
const Styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5DC",
        paddingHorizontal: 20,
      },
      logo: {
        fontSize: 24,
        fontWeight: "bold",
        justifyContent:'center'
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20,
        textAlign:'left',
        justifyContent:'center'
      },
      content: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 20,
        justifyContent:'center'
      },
      dot: {
        backgroundColor: "#D3D3D3",
        width: 30,
        height: 5,
        borderRadius: 4,
        marginHorizontal: 3,
      },
      activeDot: {
        backgroundColor: "#7E8356",
        width: 30,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 3,
      },
      buttonContainer: {
        flexDirection: "row",
        marginTop: '150%',
        position:'relative',
      },
      skipButton: {
        width:'50%',
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginRight: 10,
      },
      nextButton: {
        width:'50%',
        backgroundColor: "#7E8356",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      skipText: {
        color: 'black',
        fontWeight: "bold",
        textAlign:'center'
      },
      nextText: {
        color: 'white',
        fontWeight: "bold",
        textAlign:'center'
      },
      getStartedButton: {
       // backgroundColor: "#7E8356",
        paddingVertical: 12,
        paddingHorizontal: 25,
        //borderRadius: 10,
        marginTop: '150%',
        borderRadius: 10,
        backgroundColor: '#7E8356',
        padding: 15,
        width:'100%'
      },
      buttonText: {
        color: 'white',
        fontWeight: "bold",
        textAlign:'center'
      },
    
})
export default OnboardingScreen;
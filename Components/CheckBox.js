import { Pressable, StyleSheet, Text, View } from "react-native"; 
import React from "react"; 
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

const CheckBox = (props) => { 

    const [isChecked, setIsChecked] = React.useState(props.isChecked);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

	const iconName = isChecked ? 
		"checkbox-marked" : "checkbox-blank-outline"; 

	return ( 
		<View style={styles.container}> 
			<Pressable onPress={handlePress}> 
				<MaterialCommunityIcons 
					name={iconName} size={24} color="#000" /> 
			</Pressable> 
			<Text style={styles.title}>{props.title}</Text> 
		</View> 
	); 
}; 

export default CheckBox; 

const styles = StyleSheet.create({ 
	container: { 
        marginTop: 20,
        alignSelf: 'flex-end',
		flexDirection: "row", 
		width: 150, 
		marginHorizontal: 5, 
	}, 
	title: { 
		fontSize: 16, 
		color: "#000", 
		marginLeft: 5, 
		fontWeight: "600", 
	}, 
}); 

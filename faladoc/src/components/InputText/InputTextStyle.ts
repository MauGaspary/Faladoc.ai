import { StyleSheet } from "react-native";
import { Colors } from "../../assets/colors";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: Colors.primary_white,
    borderRadius: 6,
    paddingLeft: 15,
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    borderWidth: 0,
    height: 50,
    width: 300,
    borderColor: Colors.primary_gray,
    marginLeft: 15,
    fontSize: 15,
    fontFamily: "Helvetica",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default style;

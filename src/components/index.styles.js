import {StyleSheet} from "react-native";
import {COLOR} from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE142'
    },
    refreshControl:{
        backgroundColor: COLOR.white
    },

    loading: {
        flex: 1,
        backgroundColor: '#59с2а6',
        color: '#426EFE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    location: {
        alignItems: 'flex-start',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },

    time: {
        textAlign: 'center',
        fontSize: 15,
        color: '#FFE142',
        backgroundColor: '#000000',
        marginLeft: 120,
        marginRight: 120,
        padding: 3,
        borderRadius: 100 / 2,
    },

    permission_body: {
        flex: 1,
        width: screenw,
        height: screenh,
        backgroundColor: COLOR.primary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: screenw * 0.05
    },

    permision_image: {
        width: screenw * 0.9,
        height: screenw * 0.9,
    },

    permission_info:{
        width: screenw * 0.85,
        height: screenw * 0.35,
        backgroundColor: COLOR.halfwhited,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: screenw * 0.02,
        borderRadius: 5,
    },

    permision_info_img: {
        width: screenw * 0.22,
        height: screenw * 0.22,
        marginRight: screenw * 0.02
    },

    permission_text: {
        width: '45%',
        height: '95%',
        fontSize: 22,
        fontWeight: '400',
        color: COLOR.black,
        borderLeftColor: COLOR.black,
        borderLeftWidth: 5,
        paddingLeft: 15
    },

    permision_button: {
        width: screenw * 0.53,
        height: screenw * 0.15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomColor: COLOR.black,
        borderBottomWidth: 5,
        borderStyle: 'dotted',
    },

    permission_btn_text: {
        color: COLOR.black,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
});
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createNativeStackNavigator();

import Login from "./Login";
import CadastroUsuario from "./tabs/CadastroUsuario";
import Tabs from "./tabs";
import MateriasACursar from "./tabs/MateriasAcursar";
import materiasCursadas from "./tabs/materiasCursadas";

///<Tab.Screen
//name="Login" component={Login} options={{headerShown: false}}
//>
export default function Rotas(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
            <Tab.Screen
                    name="Login" component={Login} options={{headerShown: false}}
                />
                <Tab.Screen 
                    name="Tabs" component={Tabs} options={{headerShown: false}}
                />                
                <Tab.Screen 
                    name="CadastroUsuario" component={CadastroUsuario} options={{headerShown: false}}
                />
                       <Tab.Screen name="MateriasACursar" component={MateriasACursar} options={{ title: 'Matérias a Cursar' }} 
                />
        <Tab.Screen name="MateriasCursadas" component={materiasCursadas} options={{ title: 'Matérias Cursadas' }} 
        />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
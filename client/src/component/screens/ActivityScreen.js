import {
    Box,
    Button,
    FlatList,
    HStack,
    ScrollView,
    Text,
    View,
} from "native-base";
import { useEffect, useState, useCallback } from "react";
import Date from "../layout/Date";
import SvgUri from "react-native-svg-uri-updated";
import { FlatGrid } from "react-native-super-grid";
import MainScreen from "../view/MainScreen";
import ActivityTaskCard from "../listItems/tasks/parents view/ActivityTaskCard";
import EmptyActivityScreen from "./EmptyActivityScreen";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY } from "../../GraphQL/Queries";
import EachActivity from "../listItems/EachActivity";
import { RefreshControl } from "react-native";
import { colors } from "../utilis/colors";

export default function ActivityScreen({ navigation }) {
    const [defaultScreen, setDefaultScreen] = useState(true);

    //define state for empty/not empty
    const [activityTaskArray, setActivityTaskArray] = useState([]);

    const { data, error, loading, refetch } = useQuery(GET_ACTIVITY, {
        variables: {
            homeId: "622ab00bfe4e52d96b61a960",
        },
        pollInterval: 500,
    });

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        data ? setActivityTaskArray(data.getActivity) : null;
        console.log(data);
    }, [data]);

    const isEmpty = activityTaskArray.length > 0;
    console.log(isEmpty);

    return !isEmpty ? (
        <EmptyActivityScreen navigation={navigation} />
    ) : (
        <View>
            <Date />
            <FlatList
                data={activityTaskArray}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <EachActivity activityObj={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        color={colors.primary.blue}
                        tintColor={colors.primary.blue}
                    />
                }
            />
        </View>
    );
}

import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>À propos de MouridHouse</Text>
            <Text style={styles.text}>
                MouridHouse est une plateforme dédiée à la vente de produits variés, allant des vêtements traditionnels aux accessoires modernes, en passant par le café et les livres. Notre mission est de fournir à nos clients des articles de qualité tout en soutenant les artisans locaux.
            </Text>
            <Text style={styles.text}>
                Fondée en 2025, MouridHouse s'engage à offrir une expérience d'achat exceptionnelle, avec un service client réactif et des livraisons rapides. Nous croyons en la valorisation de la culture locale et en la promotion de produits authentiques.
            </Text>
            <Text style={styles.text}>
                Merci de faire partie de notre communauté et de soutenir MouridHouse. Nous sommes impatients de vous servir et de vous aider à découvrir des produits uniques qui enrichiront votre quotidien.
            </Text>
            <Text style={styles.text}>
                L'équipe MouridHouse 😊 est joingnable sur:
                {"\n"}- Email:mouridhouse@gmail.com
                {"\n"}- Téléphone: +221 70 606 32 17
            </Text>
        </View>
    );
}           
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#135de7",
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        color: "#333",
        textAlign: "justify",
    },
});
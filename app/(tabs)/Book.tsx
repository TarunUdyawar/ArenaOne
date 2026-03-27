import {
  FlatList,
  Image,

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { shadows } from "@/src/constants/shadows";
import { colors } from "@/src/constants/Colors";
import Navbar from "@/src/components/NavBar";
import { router } from "expo-router";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Book() {
  const sportsVenue = [
    {
      name: "Dream Sports Fields – Malad West",
      rating: 4.0,
      deferLink: "https://playo.page.link/dreamMalad",
      fullLink: "https://playo.co/venue/?venueId=dream-sports-fields-malad",
      address:
        "5RCM+XQC, Inorbit Rd, Malad, Mindspace, Malad West, Mumbai, Maharashtra 400064",
      avgRating: 4.0,
      ratingCount: 380,
      lat: 19.1724943,
      lng: 72.8344247,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      image:
        "https://playo.gumlet.io/DREAMSPORTSFIELDSINORBITMALADFOOTBALLCRICKETTURF/1.png",
      filter_by: ["Football", "Basketball", "Volleyball", "Futsal"],
      amenities: [
        "Changing Rooms 🚻",
        "Parking 🅿️",
        "Drinking Water 💧",
        "Restrooms 🚽",
      ],
      info: '\n \u00a0 \u00a0<h3>Dream Sports Fields – Malad West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.0 [380]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Basketball, Volleyball, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98765 12345<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/dreamMalad" target="_blank">Book Now</a><br/>\n',
    },
    {
      name: "The Arena – Andheri East",
      rating: 4.2,
      deferLink: "https://playo.page.link/arenaAndheri",
      fullLink: "https://playo.co/venue/?venueId=arena-andheri-east",
      avgRating: 4.2,
      ratingCount: 65,
      lat: 19.1138,
      lng: 72.8828,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Volleyball", "Cricket", "Badminton"],
      amenities: [
        "Cafeteria 🍔",
        "Locker Rooms 🔒",
        "Showers 🚿",
        "Parking 🅿️",
      ],
      info: '\n \u00a0 \u00a0<h3>The Arena – Andheri East</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.2 [65]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Volleyball, Cricket, Badminton<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 99220 56789<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/arenaAndheri" target="_blank">Book Now</a><br/>\n',
      image:
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/7/2017/02/27155415/270217_Arena.jpg",
      address:
        "Jitendra Industrial Estate, Andheri - Kurla Rd, Vijay Nagar Colony, Hanuman Nagar, Andheri East, Mumbai, Maharashtra 400093",
    },
    {
      name: "St. Andrews Turf – Bandra West",
      rating: 4.1,
      deferLink: "https://playo.page.link/andrewsBandra",
      fullLink: "https://playo.co/venue/?venueId=andrews-turf-bandra",
      avgRating: 4.1,
      ratingCount: 32,
      lat: 19.06,
      lng: 72.8365,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Cricket", "Tennis", "Hockey"],
      amenities: ["Floodlights 💡", "Restrooms 🚻", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>St. Andrews Turf – Bandra West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.1 [32]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Cricket, Tennis, Hockey<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98112 34567<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/andrewsBandra" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipM5Lll-w54b_3G_HvrLgjFWN2_BmHwnHHRlz8Q3=w408-h306-k-no",
      address:
        "St. Andrews School Ground, St Domnic Rd, Santosh Nagar, Bandra West, Mumbai, Maharashtra 400050",
    },
    {
      name: "Indian Football School – Churchgate",
      rating: 4.3,
      deferLink: "https://playo.page.link/ifsChurchgate",
      fullLink: "https://playo.co/venue/?venueId=ifs-churchgate",
      avgRating: 4.3,
      ratingCount: 45,
      lat: 18.9321,
      lng: 72.8323,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Table Tennis", "Squash", "Basketball"],
      amenities: ["Cafeteria 🍔", "Locker Rooms 🔒", "Parking 🅿️"],
      info: '\n \u00a0 \u00a0<h3>Indian Football School – Churchgate</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.3 [45]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Table Tennis, Squash, Basketball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98200 12345<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/ifsChurchgate" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipN7TkYSd-v_16TYoajbXwZgO49roOQSTctMvA0u=w408-h277-k-no",
      address:
        "Maharshi Karve Rd, Dr Ambedkar Statue Chowk Area, Churchgate, Mumbai, Maharashtra 400021",
    },
    {
      name: "Urban Sports – Vile Parle East",
      rating: 4.4,
      deferLink: "https://playo.page.link/urbanVileParle",
      fullLink: "https://playo.co/venue/?venueId=urban-vileparle",
      avgRating: 4.4,
      ratingCount: 120,
      lat: 19.1112,
      lng: 72.8476,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Badminton", "Tennis", "Futsal"],
      amenities: ["Changing Rooms 🚻", "Showers 🚿", "Restrooms 🚽"],
      info: '\n \u00a0 \u00a0<h3>Urban Sports – Vile Parle East</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.4 [120]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Badminton, Tennis, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 99300 54321<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/urbanVileParle" target="_blank">Book Now</a><br/>\n',
      image: "https://playo.gumlet.io/URBANSPORTSVILEPARLE/UrbanSportsVileParle0.jpg",
      address:
        "Prabodhankar Thackeray Krida Sankul, Shahaji Raje Marg, Vishnu Prasad Society, Navpada, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057",
    },
    {
      name: "JS Turf – Borivali West",
      rating: 4.0,
      deferLink: "https://playo.page.link/jsturfBorivali",
      fullLink: "https://playo.co/venue/?venueId=js-turf-borivali",
      avgRating: 4.0,
      ratingCount: 10,
      lat: 19.2345,
      lng: 72.8543,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Hockey", "Cricket", "Volleyball"],
      amenities: ["Drinking Water 💧", "Restrooms 🚻", "Parking 🅿️"],
      info: '\n \u00a0 \u00a0<h3>JS Turf – Borivali West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.0 [10]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Hockey, Cricket, Volleyball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98765 67890<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/jsturfBorivali" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/JSTURFCRICKETANDFOOTBALLGROUND/1.png?format=webp&q=60&ar=16:9&mode=crop&overlay=https://playo-website.gumlet.io/playo-website-v2/logos-icons/Playo-Logo-Green-01.png&overlay_width_pct=0.2&overlay_height_pct=1&overlay_position=bottomright",
      address:
        "New Link Rd, behind Om Lalita Petrol Pump, Eksar Village, I C Colony, Borivali West, Mumbai, Maharashtra 400103",
    },
    {
      name: "Astro Park – Lower Parel",
      rating: 4.2,
      deferLink: "https://playo.page.link/astroParel",
      fullLink: "https://playo.co/venue/?venueId=astro-park-lower-parel",
      avgRating: 4.2,
      ratingCount: 20,
      lat: 18.9974,
      lng: 72.817,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Tennis", "Basketball", "Squash"],
      amenities: ["Changing Rooms 🚻", "Showers 🚿", "Cafeteria 🍔"],
      info: '\n \u00a0 \u00a0<h3>Astro Park – Lower Parel</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.2 [20]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Tennis, Basketball, Squash<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98250 22446<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/astroParel" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/ASTROPARKLOWERPAREL/Astropark1.jpg",
      address:
        "Raghuvanshi Mills, the terrace of Raghuvanshi Mansion Above Pinakin Entry Gate, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
    },
    {
      name: "HotFut – Dadar West",
      rating: 4.1,
      deferLink: "https://playo.page.link/hotFutDadar",
      fullLink: "https://playo.co/venue/?venueId=hotfut-dadar",
      avgRating: 4.1,
      ratingCount: 15,
      lat: 19.0198,
      lng: 72.8425,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Squash", "Badminton", "Futsal"],
      amenities: ["Parking 🅿️", "Restrooms 🚽", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>HotFut – Dadar West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.1 [15]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Squash, Badminton, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98190 11223<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/hotFutDadar" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMquf0TY7ODMt2qRk4ABM1vRBsAhn4Z86Pz5C-B=w408-h244-k-no",
      address:
        "Hind Service Industrial Premises Co-op Society, Veer Sawarkar Marg, Dadar West, Dadar, Mumbai, Maharashtra 400028",
    },
    {
      name: "HomeGround – Kandivali East",
      rating: 4.0,
      deferLink: "https://playo.page.link/homeGroundKandivali",
      fullLink: "https://playo.co/venue/?venueId=homeground-kandivali",
      avgRating: 4.0,
      ratingCount: 25,
      lat: 19.23,
      lng: 72.857,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Basketball", "Cricket", "Hockey"],
      amenities: ["Floodlights 💡", "Cafeteria 🍔", "Locker Rooms 🔒"],
      info: '\n \u00a0 \u00a0<h3>HomeGround – Kandivali East</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.0 [25]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Basketball, Cricket, Hockey<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98765 33456<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/homeGroundKandivali" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/HOMEGROUNDTURF/HomeGroundTurf2.jpg",
      address:
        "Thakur Stadium, Thakur, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101",
    },
    {
      name: "Kunal Sports Arena – Goregaon",
      rating: 4.3,
      deferLink: "https://playo.page.link/kunalGoregaon",
      fullLink: "https://playo.co/venue/?venueId=kunal-arena-goregaon",
      avgRating: 4.3,
      ratingCount: 18,
      lat: 19.1471,
      lng: 72.846,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Volleyball", "Basketball", "Futsal"],
      amenities: ["Changing Rooms 🚻", "Showers 🚿", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>Kunal Sports Arena – Goregaon</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.3 [18]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Volleyball, Basketball, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98222 99887<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/kunalGoregaon" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/KUNALSPORTSARENA/kunalsportsarena0.jpg",
      address:
        "Virwani Industrial Estate, Western Urban Rd, Hanuman Tekdi, Goregaon, Mumbai, Maharashtra 400063",
    },
    {
      name: "Battlefield – Little Angels Turf, Sion",
      rating: 3.7,
      deferLink: "https://playo.page.link/battleSion",
      fullLink: "https://playo.co/venue/?venueId=battle-little-angels-sion",
      avgRating: 3.7,
      ratingCount: 6,
      lat: 19.0183,
      lng: 72.845,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Badminton", "Table Tennis", "Futsal"],
      amenities: ["Restrooms 🚻", "Parking 🅿️", "Floodlights 💡"],
      info: '\n \u00a0 \u00a0<h3>Battlefield – Little Angels Turf, Sion</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 3.7 [6]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Badminton, Table Tennis, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98760 44567<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/battleSion" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/BATTLEFIELDLITTLEANGELSTURF20240109125706158433/BattlefieldLittleAngelsTurf1704805547019.jpeg",
      address:
        "Inside of Little Angels' International School, Shastri Lane, behind Manav Seva Sangh Hall, Sion West, Sion, Mumbai, Maharashtra 400019",
    },
    {
      name: "Battlefield – Andheri Chintamani Plaza",
      rating: 3.5,
      deferLink: "https://playo.page.link/battleAndheri",
      fullLink: "https://playo.co/venue/?venueId=battle-andheri-chintamani",
      avgRating: 3.5,
      ratingCount: 4,
      lat: 19.119,
      lng: 72.844,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Tennis", "Basketball", "Squash"],
      amenities: ["Drinking Water 💧", "Restrooms 🚽", "Showers 🚿"],
      info: '\n \u00a0 \u00a0<h3>Battlefield – Andheri Chintamani Plaza</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 3.5 [4]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Tennis, Basketball, Squash<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98760 55678<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/battleAndheri" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipOkJ8otMFESqMnM12L7fOyhXoI_biUIJjEwQ8Ql=w408-h544-k-no",
      address:
        "Chintamani Plaza, Andheri - Kurla Rd, Mota Nagar, Andheri East, Mumbai, Maharashtra 400099",
    },
    {
      name: "Ileseum Raheja Futsal – Navi Mumbai",
      rating: 4.7,
      deferLink: "https://playo.page.link/rahejaFutsal",
      fullLink: "https://playo.co/venue/?venueId=raheja-futsal-navi",
      avgRating: 4.7,
      ratingCount: 3,
      lat: 19.077,
      lng: 73.032,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Table Tennis", "Badminton", "Volleyball"],
      amenities: ["Cafeteria 🍔", "Locker Rooms 🔒", "Parking 🅿️"],
      info: '\n \u00a0 \u00a0<h3>Ileseum Raheja Futsal – Navi Mumbai</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.7 [3]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Table Tennis, Badminton, Volleyball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 97654 32109<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/rahejaFutsal" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/ILESEUMRAHEJADISTRICTFUTSALTURF20240929104858158010/IleseumRahejaDistrictFutsalTurf1727607245957.jfif?auto=compress,format&h=300",
      address:
        "Raheja District, MIDC Industrial Area, Shiravane, Juinagar, Navi Mumbai, Maharashtra 400705",
    },
    {
      name: "V4 Sports Arena – Bhandup",
      rating: 5.0,
      deferLink: "https://playo.page.link/v4Bhandup",
      fullLink: "https://playo.co/venue/?venueId=v4-sports-bhandup",
      avgRating: 5.0,
      ratingCount: 1,
      lat: 19.16,
      lng: 72.95,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Squash", "Basketball", "Tennis"],
      amenities: ["Floodlights 💡", "Changing Rooms 🚻", "Showers 🚿"],
      info: '\n \u00a0 \u00a0<h3>V4 Sports Arena – Bhandup</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 5.0 [1]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Squash, Basketball, Tennis<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98880 55667<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/v4Bhandup" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/VHOOPIEARENA/V4SportsArena1746784245008.jpeg",
      address:
        "Yashwant Smruti, ANAND NAGAR BARKHA CO-OPERATIVE GROUP HOUSING SOCIETY, Bhandup Village Rd, opp. Usha Nagar, Usha Nagar, Bhandup West, Mumbai, Maharashtra 400078",
    },
    {
      name: "The Sports Foundry – Bhandup",
      rating: 4.4,
      deferLink: "https://playo.page.link/foundryBhandup",
      fullLink: "https://playo.co/venue/?venueId=foundry-bhandup",
      avgRating: 4.4,
      ratingCount: 78,
      lat: 19.165,
      lng: 72.965,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Hockey", "Cricket", "Badminton"],
      amenities: [
        "Restrooms 🚻",
        "Drinking Water 💧",
        "Parking 🅿️",
        "Cafeteria 🍔",
      ],
      info: '\n \u00a0 \u00a0<h3>The Sports Foundry – Bhandup</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.4 [78]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Hockey, Cricket, Badminton<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 97654 12345<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/foundryBhandup" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipM1xVclGfwkD1tB6EW5KFNp4lwOxgd88iXniFPJ=w408-h306-k-no",
      address:
        "Rolex Metal Industries Compound, Village Road, Lal Bahadur Shastri Marg, Subhash Nagar, Bhandup West, Mumbai, Maharashtra 400078",
    },
    {
      name: "Battlefield – Mulund West",
      rating: 5.0,
      deferLink: "https://playo.page.link/battleMulund",
      fullLink: "https://playo.co/venue/?venueId=battle-mulund-west",
      avgRating: 5.0,
      ratingCount: 2,
      lat: 19.164,
      lng: 72.956,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Volleyball", "Futsal", "Cricket"],
      amenities: ["Locker Rooms 🔒", "Showers 🚿", "Cafeteria 🍔"],
      info: '\n \u00a0 \u00a0<h3>Battlefield – Mulund West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 5.0 [2]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Volleyball, Futsal, Cricket<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98700 11122<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/battleMulund" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/BATTLEFIELDMULUND20230921113925808963/battlefieldmulund1695296314077.png?auto=compress,format&h=300",
      address:
        "Minerva Industrial Estate, Plot No.112, near Hercules Hoist, Asha Nagar, Mulund West, Mumbai, Maharashtra 400080",
    },
    {
      name: "Force Playing Fields – Dahisar",
      rating: 5.0,
      deferLink: "https://playo.page.link/forceDahisar",
      fullLink: "https://playo.co/venue/?venueId=force-dahisar",
      avgRating: 5.0,
      ratingCount: 3,
      lat: 19.237,
      lng: 72.854,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Basketball", "Hockey", "Tennis"],
      amenities: [
        "Drinking Water 💧",
        "Restrooms 🚻",
        "Parking 🅿️",
        "Floodlights 💡",
      ],
      info: '\n \u00a0 \u00a0<h3>Force Playing Fields – Dahisar</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 5.0 [3]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Basketball, Hockey, Tennis<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98722 33445<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/forceDahisar" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/FORCEPLAYINGFIELDSDAHISAR20250219124248378259/ForcePlayingFieldsDahisar1739969193325.jpeg",
      address:
        "7V2F+39X, Suhasini Pawaskar Rd, Vaishali Nagar, Dahisar East, Mumbai, Maharashtra 400068",
    },
    {
      name: "Fr. Agnel Stadium – Vashi",
      rating: 4.5,
      deferLink: "https://playo.page.link/agnelVashi",
      fullLink: "https://playo.co/venue/?venueId=agnel-stadium-vashi",
      avgRating: 4.5,
      ratingCount: 50,
      lat: 19.0728,
      lng: 73.0104,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: [
        "Football",
        "Multi-sport",
        "Cricket",
        "Basketball",
        "Volleyball",
      ],
      amenities: [
        "Changing Rooms 🚻",
        "Showers 🚿",
        "Cafeteria 🍔",
        "Locker Rooms 🔒",
      ],
      info: '\n \u00a0 \u00a0<h3>Fr. Agnel Stadium – Vashi</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.5 [50]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Multi-sport, Cricket, Basketball, Volleyball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98330 11234<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/agnelVashi" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/FRAGNELMULTIPURPOSESCHOOLANDJRCOLLEGE/2.png",
      address:
        "3XHV+P5M, Juhu Nagar, Sector 10A, Vashi, Navi Mumbai, Maharashtra 400703",
    },
    {
      name: "Cooperage Ground – Nariman Point",
      rating: 4.2,
      deferLink: "https://playo.page.link/cooperage",
      fullLink: "https://playo.co/venue/?venueId=cooperage-ground",
      avgRating: 4.2,
      ratingCount: 60,
      lat: 18.9226,
      lng: 72.821,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Hockey", "Cricket", "Tennis"],
      amenities: ["Parking 🅿️", "Restrooms 🚻", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>Cooperage Ground – Nariman Point</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.2 [60]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Hockey, Cricket, Tennis<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98201 22334<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/cooperage" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/COOPERAGEGROUND/CooperageGround3.jpg",
      address:
        "Maharshi Karve Rd, Dr Ambedkar Statue Chowk Area, Nariman Point, Mumbai, Maharashtra 400021",
    },
    {
      name: "Oval Maidan – Churchgate",
      rating: 4.0,
      deferLink: "https://playo.page.link/ovalMaidan",
      fullLink: "https://playo.co/venue/?venueId=oval-maidan",
      avgRating: 4.0,
      ratingCount: 45,
      lat: 18.922,
      lng: 72.83,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: [
        "Football",
        "Recreation",
        "Badminton",
        "Cricket",
        "Basketball",
      ],
      amenities: ["Restrooms 🚻", "Drinking Water 💧", "Floodlights 💡"],
      info: '\n \u00a0 \u00a0<h3>Oval Maidan – Churchgate</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.0 [45]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Recreation, Badminton, Cricket, Basketball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98190 55678<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/ovalMaidan" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/OVALMAIDAN/1.png",
      address:
        "140, महर्षी कर्वे, रोड, Mantralaya, Churchgate, Mumbai, Maharashtra 400032",
    },
    {
      name: "Azad Maidan – Fort",
      rating: 4.1,
      deferLink: "https://playo.page.link/azadMaidan",
      fullLink: "https://playo.co/venue/?venueId=azad-maidan",
      avgRating: 4.1,
      ratingCount: 50,
      lat: 18.9219,
      lng: 72.8313,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Cricket", "Basketball", "Hockey", "Volleyball"],
      amenities: ["Changing Rooms 🚻", "Restrooms 🚻", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>Azad Maidan – Fort</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.1 [50]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Cricket, Basketball, Hockey, Volleyball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98200 33445<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/azadMaidan" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/AZADMAIDAN/1.png",
      address: "Fort Mumbai, Maharashtra",
    },
    {
      name: "Oval Maidan’s Cross Ground",
      rating: 3.9,
      deferLink: "https://playo.page.link/crossMaidan",
      fullLink: "https://playo.co/venue/?venueId=cross-maidan",
      avgRating: 3.9,
      ratingCount: 40,
      lat: 18.9205,
      lng: 72.831,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Volleyball", "Tennis", "Futsal"],
      amenities: ["Parking 🅿️", "Restrooms 🚻", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>Cross Maidan – Churchgate</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 3.9 [40]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Volleyball, Tennis, Futsal<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98300 44556<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/crossMaidan" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/OVALMAIDAN/3.png",
      address:
        "WRQH+5VR, New Marine Lines, Marine Lines, Mumbai, Maharashtra 400020",
    },
    {
      name: "Football Paradise – Kandivali",
      rating: 4.2,
      deferLink: "https://playo.page.link/footballParadise",
      fulllink: "https://playo.co/venue/?venueId=football-paradise-kandivali",
      avgRating: 4.2,
      ratingCount: 22,
      lat: 19.225,
      lng: 72.855,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Table Tennis", "Futsal", "Badminton"],
      amenities: [
        "Cafeteria 🍔",
        "Locker Rooms 🔒",
        "Showers 🚿",
        "Parking 🅿️",
      ],
      info: '\n \u00a0 \u00a0<h3>Football Paradise – Kandivali</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.2 [22]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Table Tennis, Futsal, Badminton<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98765 77889<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/footballParadise" target="_blank">Book Now</a><br/>\n',
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMbNj8xJyD4JDmOIbFxZUHNfrAAtiQcQfEzAoa-=w408-h306-k-no",
      address:
        "Goalster Sports Arena, next to Thakur Shyamnarayan School, Kandivali, Evershine Millennium Paradise, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101",
    },
    {
      name: "Kick Turf – Powai",
      rating: 4.3,
      deferLink: "https://playo.page.link/kickPowai",
      fullLink: "https://playo.co/venue/?venueId=kick-turf-powai",
      avgRating: 4.3,
      ratingCount: 18,
      lat: 19.1176,
      lng: 72.905,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Squash", "Tennis", "Basketball"],
      amenities: ["Changing Rooms 🚻", "Restrooms 🚻", "Drinking Water 💧"],
      info: '\n \u00a0 \u00a0<h3>Kick Turf – Powai</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.3 [18]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Squash, Tennis, Basketball<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98822 33445<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/kickPowai" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/KICK/kick0.jpg",
      address:
        "4W64+PX4, Kensington Rear Exit Road, Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076",
    },
    {
      name: "Bravehearts Football Skool – Juhu",
      rating: 4.5,
      deferLink: "https://playo.page.link/braveMalad",
      fullLink: "https://playo.co/venue/?venueId=bravehearts-malad",
      avgRating: 4.5,
      ratingCount: 12,
      lat: 19.1643,
      lng: 72.828,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Badminton", "Volleyball", "Cricket"],
      amenities: ["Floodlights 💡", "Cafeteria 🍔", "Parking 🅿️"],
      info: '\n \u00a0 \u00a0<h3>Bravehearts Football Skool – Malad West</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.5 [12]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Badminton, Volleyball, Cricket<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98701 22334<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/braveMalad" target="_blank">Book Now</a><br/>\n',
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVYxEameQ9esd5Y_iispbpig_G64wJCn_lQ&s",
      address:
        "2, Birla Ln, Uditi Tarang Housing Colony, Janki Kutir, Juhu Tara, Juhu, Mumbai, Maharashtra 400049",
    },
    {
      name: "Agnel Astroturf – Vashi",
      rating: 4.5,
      deferLink: "https://playo.page.link/agnelVashi2",
      fullLink: "https://playo.co/venue/?venueId=agnel-stadium-vashi2",
      avgRating: 4.5,
      ratingCount: 30,
      lat: 19.0728,
      lng: 73.0104,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Multi-sport", "Cricket", "Basketball", "Tennis"],
      amenities: ["Restrooms 🚻", "Drinking Water 💧", "Locker Rooms 🔒"],
      info: '\n \u00a0 \u00a0<h3>RCF Ground – Chembur</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.5 [30]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Cricket<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98310 55678<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/agnelVashi2" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/ASTROTURFSUS20240905105217995258/AstroturfSUS1725533615091.jfif",
      address:
        "JN-2-B-2/76, Dr Mar Theophilus Marg, Juhu Nagar, Sector 9, Vashi, Navi Mumbai, Maharashtra 400703",
    },
    {
      name: "RCF Ground – Chembur",
      rating: 4.0,
      deferLink: "https://playo.page.link/rcfChembur",
      fullLink: "https://playo.co/venue/?venueId=rcf-ground-chembur",
      avgRating: 4.0,
      ratingCount: 5,
      lat: 19.067,
      lng: 72.9022,
      icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
      filter_by: ["Football", "Multi-sport", "Cricket", "Hockey", "Volleyball"],
      amenities: [
        "Showers 🚿",
        "Changing Rooms 🚻",
        "Cafeteria 🍔",
        "Parking 🅿️",
      ],
      info: '\n \u00a0 \u00a0<h3>RCF Ground – Chembur</h3>\n \u00a0 \u00a0<strong>Ratings:</strong> 4.0 [5]<br/>\n \u00a0 \u00a0<strong>Sports:</strong> Football, Cricket<br/>\n \u00a0 \u00a0<strong>Phone:</strong> 98250 66555<br/>\n \u00a0 \u00a0<a href="https://playo.page.link/rcfChembur" target="_blank">Book Now</a><br/>\n',
      image:
        "https://playo.gumlet.io/RCFSPORTSCLUB/2.png",
      address:
        "RCF Krida Sankul Sports Complex, RCF Colony, Chembur, Mumbai, Maharashtra 400074",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <SafeAreaView>



        <Navbar />
        <FlatList
          data={sportsVenue}
          contentContainerStyle={{ paddingBottom: 70 }}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 150, damping: 15 }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 30,
                  marginBottom: 16,
                  overflow: "hidden",
                  shadowColor: colors.accent,
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 6,
                  marginTop: 20,
                  margin: 14,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/VenueInfo",
                    params: {
                      Venues: JSON.stringify(item),
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: "100%", height: 160 }}
                  resizeMode="cover"
                />
                <View style={{ padding: 12 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {item?.name}
                  </Text>
                  <Text style={{ color: "#aaa", marginTop: 2 }} numberOfLines={2}>
                    {item?.address}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 16,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Ionicons name="star" size={18} color="#FFD700" />
                    <Text style={{ color: "white", marginLeft: 6 }}>
                      {item?.rating}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </MotiView>
          )}
        />

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
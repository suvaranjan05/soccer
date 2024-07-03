import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Image } from "@chakra-ui/react";

export default function NewsCard() {
  return (
    <Box mt={{ base: 4, md: 0, lg: 0 }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <MyImage />
        </SwiperSlide>
        <SwiperSlide>
          <MyImage />
        </SwiperSlide>
        <SwiperSlide>
          <MyImage />
        </SwiperSlide>
        <SwiperSlide>
          <MyImage />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

function MyImage() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1628891890377-57dba2715caf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjB0ZWFtfGVufDB8fDB8fHww"
      borderRadius="lg"
    />
  );
}

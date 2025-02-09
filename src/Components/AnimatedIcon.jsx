import Lottie from "lottie-react";

const AnimatedIcon = ({ style, animationData, loop }) => {
    return <Lottie
        animationData={animationData}
        loop={loop}
        style={style}
    />
};

export default AnimatedIcon;

import { SVGProps } from "react";


export const FlowerIcon = ({
  flowerColor = {
    petal_top: "#FF4F87",
    petal_bottom: "#FF3B6E",
    petal_left: "#FF4F87",
    petal_right: "#FF3B6E",
    shadow_top: "#C72E5D",
    shadow_bottom: "#B22C4A",
    shadow_left: "#C72E5D",
    shadow_right: "#B22C4A",
    center: "#FFD447",
    center_shadow: "#C79A29",
  },
  ...props
}: SVGProps<SVGSVGElement> & {
  flowerColor: {
    petal_top: string;
    petal_bottom: string;
    petal_left: string;
    petal_right: string;
    shadow_top: string;
    shadow_bottom: string;
    shadow_left: string;
    shadow_right: string;
    center: string;
    center_shadow: string;
  };
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      {...props}
      viewBox="0 0 512 512"
      fill="none"
    >
      <path
        className="petal petal-bottom"
        fill={flowerColor.petal_bottom}
        d="M398.231 369.77C398.231 448.321 334.551 512 256 512c-78.545 0-142.221-63.679-142.221-142.23 0-78.539 63.676-142.212 142.221-142.212 78.551 0 142.231 63.673 142.231 142.212Z"
      />
      <path
        className="petal petal-left"
        fill={flowerColor.petal_left}
        d="M142.221 113.77c78.548 0 142.221 63.673 142.221 142.224 0 78.545-63.673 142.224-142.221 142.224C63.68 398.219 0 334.539 0 255.994 0 177.443 63.68 113.77 142.221 113.77Z"
      />

      <path
        className="petal-shadow shadow-left"
        fill={flowerColor.shadow_left}
        d="M116.15 116.225a143.227 143.227 0 0 0-2.356 26c0 78.551 63.642 142.205 142.206 142.205h1.756c-77.302 8.532-147.276-46.635-156.763-124.039-1.708-13.955-1.355-27.654.901-40.808l14.256-3.358Z"
      />
      <path
        className="petal petal-top"
        fill={flowerColor.petal_top}
        d="M398.231 142.224c0 78.545-63.68 142.218-142.231 142.218-78.545 0-142.221-63.673-142.221-142.218C113.779 63.679 177.455 0 256 0c78.551 0 142.231 63.68 142.231 142.224Z"
      />
      <path
        className="petal-shadow shadow-top"
        fill={flowerColor.shadow_top}
        d="M395.744 116.116c-8.378-1.551-17.064-2.353-25.949-2.353-78.564 0-142.256 63.692-142.256 142.257 0 .545.051 1.147.051 1.75-8.539-77.302 46.635-147.327 123.981-156.808 13.961-1.705 27.66-1.359 40.808.904l3.365 14.25Z"
      />
      <path
        className="petal petal-right"
        fill={flowerColor.petal_right}
        d="M369.769 113.77C448.32 113.77 512 177.443 512 255.994c0 78.545-63.68 142.224-142.231 142.224-78.538 0-142.211-63.68-142.211-142.224 0-78.551 63.673-142.224 142.211-142.224Z"
      />
      <path
        className="petal-shadow shadow-bottom"
        fill={flowerColor.shadow_bottom}
        d="M119.618 410.116c13.154 2.263 26.85 2.609 40.805.903 77.352-9.487 132.525-79.512 123.987-156.763 0 .551.051 1.154.051 1.763 0 78.499-63.692 142.205-142.256 142.205-8.891 0-17.568-.807-25.949-2.358l3.362 14.25Z"
      />
      <path
        className="petal-shadow shadow-right"
        fill={flowerColor.shadow_right}
        d="M410.103 392.397c2.263-13.154 2.609-26.852.904-40.808-9.488-77.404-79.462-132.57-156.763-123.987.596 0 1.154-.045 1.757-.045 78.564 0 142.205 63.699 142.205 142.205 0 8.878-.801 17.564-2.359 26l14.256-3.365Z"
      />
      <path
        className="center"
        fill={flowerColor.center}
        d="M329.621 256.007c0 40.654-32.967 73.616-73.621 73.616-40.66 0-73.622-32.962-73.622-73.616 0-40.66 32.962-73.628 73.622-73.628 40.654-.001 73.621 32.967 73.621 73.628Z"
      />
      <path
        className="center-shadow"
        fill={flowerColor.center_shadow}
        d="M303.673 199.962c10.942 12.847 17.577 29.475 17.577 47.68 0 40.654-32.962 73.615-73.615 73.615-18.199 0-34.834-6.634-47.68-17.577 13.506 15.852 33.583 25.943 56.045 25.943 40.654 0 73.621-32.962 73.621-73.616 0-22.462-10.089-42.539-25.948-56.045Z"
      />
    </svg>
  );
};

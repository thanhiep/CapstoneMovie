import { memo } from "react";

type Props = {
  renderLike: () => string;
};

function Child(props: Props) {
  console.log("child", props);
  return (
    <div>
      Child
      <h4>{props.renderLike()}</h4>
    </div>
  );
}

export default memo(Child);

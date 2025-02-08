import React from "react";

const PreviewContent = () => {
  return (
    <div>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dicta veritatis animi porro iste? Placeat molestias velit voluptatibus deserunt ea quidem aperiam aliquid magnam consectetur, distinctio voluptatem? Laboriosam adipisci quod officiis tempore consectetur voluptas! Corrupti officia vitae incidunt sed quam culpa? Consequatur ratione recusandae modi deleniti, ut dolores maxime officiis rerum aliquid ipsa dolorem eaque quas maiores. Alias, quibusdam, vitae, architecto necessitatibus et blanditiis totam nemo officiis impedit vel veritatis eaque voluptatibus exercitationem aliquam quas rem consectetur natus cupiditate nobis facere cumque optio rerum voluptate. Inventore corporis dolores numquam veniam temporibus quidem nulla id deserunt. Eveniet nemo itaque accusantium ut.
          </p>
        ))}
    </div>
  );
};

export default PreviewContent;

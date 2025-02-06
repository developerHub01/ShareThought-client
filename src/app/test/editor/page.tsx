import React from "react";
import Popover from "./_components/Popover";

const EditorPage = () => {
  return (
    <div className="p-5">
      <Popover />
      <div className="w-full max-w-5xl mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <P key={index} />
        ))}
      </div>
    </div>
  );
};

const P = () => (
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nostrum
    laborum nemo magnam nihil voluptatibus ad quae quisquam possimus minus
    veniam odio non rem fugiat consectetur consequuntur blanditiis dolor eum,
    modi ut. Quae cumque id voluptate officia esse. Illo, tempore accusantium
    reprehenderit architecto voluptates porro quaerat praesentium animi, vero
    odit alias possimus maiores earum amet, quibusdam perferendis facere
    similique nobis nam? Provident, ipsam? Debitis, officiis magni. Placeat ab
    totam ipsam quaerat accusantium facere quo, earum pariatur, officia minus,
    blanditiis explicabo eius sunt at aliquam porro distinctio sapiente. Sunt a
    expedita dicta ratione quis asperiores quae at possimus quasi, delectus
    quibusdam porro vel! Et aliquam architecto a aperiam, labore, suscipit ut,
    minima quo iusto nisi ex non libero? Ea, maxime voluptates. Commodi, cum
    quibusdam aliquid minima delectus ex assumenda similique, esse officia
    voluptas eius consequatur eum, minus quis. Consequuntur saepe non unde,
    asperiores dolores odit incidunt eaque accusantium veritatis sapiente
    inventore at laudantium voluptatum! Officia modi deserunt, numquam eius id
    asperiores necessitatibus soluta qui eveniet, reprehenderit, odit obcaecati
    enim in. Eveniet tenetur, voluptates beatae ea labore quam nesciunt earum
    in? Ab, fugit. Reiciendis adipisci natus voluptate quo aliquid sed ad
    repellendus at molestias consectetur. Aut tenetur voluptates rerum sapiente
    reiciendis dignissimos, veritatis iste distinctio nesciunt aspernatur
    blanditiis praesentium, consequatur illum accusantium fugit corporis a,
    accusamus quidem voluptatibus! Ea quisquam ullam harum minus eaque beatae
    quod dolorum obcaecati quibusdam nihil. Nulla ut sit dolore optio soluta
    obcaecati non iure commodi at dolores accusamus rerum veniam nam cupiditate
    blanditiis molestiae tempore autem, distinctio vel? Quam qui eligendi eum ex
    quos molestias quod illo quibusdam, neque eos velit doloribus deserunt
    obcaecati, nam odio facere. Itaque, doloribus cumque fugiat eius qui modi
    veniam quos quidem quas? Iure iusto corporis, nihil aperiam unde minima ab
    sit, atque praesentium quas at molestiae consequuntur similique ducimus quia
    voluptas iste sapiente quisquam aspernatur reprehenderit deserunt fugit
    natus quaerat laboriosam. Adipisci perspiciatis animi veniam perferendis
    alias ab eos voluptatibus doloribus illo, consequatur aliquid id, quasi
    quaerat necessitatibus dignissimos beatae laudantium iusto excepturi. Quis
    eum odit explicabo reiciendis quam nemo eaque, iure exercitationem vel error
    rerum voluptatum cumque, minus saepe, ex ullam molestias esse. Fuga
    molestias sint laboriosam dicta explicabo non officia doloribus esse,
    commodi amet odit ex? Cumque dignissimos omnis consectetur eos fugiat,
    deserunt architecto, quas ea delectus sint officiis perferendis, reiciendis
    distinctio maxime voluptatem nobis cum? Corrupti corporis harum minima, non
    a aliquid, laborum quaerat nulla cum soluta perspiciatis minus commodi, sed
    exercitationem temporibus mollitia. Qui enim sint error iste nesciunt
    similique necessitatibus rem! Cum alias explicabo, ipsam, doloribus minus
    iste iusto itaque inventore at soluta sed pariatur repudiandae ullam commodi
    officia molestiae! Quidem aperiam corrupti aut maiores optio! Quaerat nemo
    labore consectetur! Libero architecto voluptas quo, iure repudiandae,
    explicabo fugit, id sit delectus molestiae animi sapiente! Tenetur, optio
    quia perspiciatis at sapiente, soluta inventore, autem atque odio voluptates
    praesentium corporis dolor incidunt vel hic culpa possimus temporibus
    voluptatem. Recusandae distinctio possimus nihil, adipisci maiores corporis
    soluta quae repudiandae cumque. Ducimus fugiat maiores in necessitatibus
    fugit cum. Cupiditate, voluptates?
  </p>
);

export default EditorPage;

import s from "./AdvantagesSection.module.css";

export default function AdvantagesSection() {
  return (
    <picture className={s.backgroundImage}>
      <source
        srcSet="/homeImg_mob.png 1x, /homeImg_mob_2x.png 2x"
        media="(max-width: 767px)"
      />
      <source
        srcSet="/homeImg_tab.png 1x, /homeImg_tab_2x.png 2x"
        media="(max-width: 767px)"
      />
      <source
        srcSet="/homeImg_PC.png 1x, /homeImg_PC_2x.png 2x"
        media="(max-width: 767px)"
      />
      <img
        src="/homeImg_mob.png"
        alt="with sugar and glucometer"
        className={s.backgroundImage}
      />
    </picture>
  );
}

import { Chip } from "@nextui-org/react";

/**
 * @param label : name of the chip
 * @param id : id of the chip
 */

function SkillChip(props) {
  const { key, label, category, state, setState, skill } = props;
  const handleSkillDelete = () => {
    let lis = state[category]?.filter((s) => s != skill);
    setState({ ...state, [category]: lis });
  };
  return (
    <Chip key={key} onClose={handleSkillDelete} variant="flat" radius="sm">
      {label}
    </Chip>
  );
}
export default SkillChip;

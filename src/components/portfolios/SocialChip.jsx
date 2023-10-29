import { Chip, Link } from "@nextui-org/react";

/**
 * @param label : name of the chip
 * @param id : id of the chip
 * @param url : url of the social link
 */

function SocialChip(props) {
  const { label, url, state, setState, id } = props;
  const handleSocialDelete = () => {
    let newState = state.filter((props) => props.id !== id);
    setState(newState);
  };
  return (
    <Link href={url} isExternal>
      <Chip key={id} onClose={handleSocialDelete} variant="flat" radius="sm">
        {label}
      </Chip>
    </Link>
  );
}
export default SocialChip;

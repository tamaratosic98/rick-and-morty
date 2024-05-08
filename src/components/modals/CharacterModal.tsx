import Modal from "antd/es/modal/Modal";
import { useMemo } from "react";
import { CharacterForm } from "../forms/CharacterForm";

export const CharacterModal = ({
  characterId,
  isModalOpen,
  setIsModalOpen,
  mode = "view",
}: {
  isModalOpen: boolean;
  characterId: string;
  setIsModalOpen: (value: boolean) => void;
  mode?: "view" | "edit";
}) => {
  const title = useMemo(() => {
    if (mode === "view") {
      return "Character Info";
    } else {
      return "Edit Character";
    }
  }, [mode]);

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <CharacterForm
        characterId={characterId}
        mode={mode}
        onSubmit={() => setIsModalOpen(false)}
      />
    </Modal>
  );
};

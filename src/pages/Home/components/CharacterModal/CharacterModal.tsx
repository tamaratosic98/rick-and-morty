import Modal from "antd/es/modal/Modal";
import { useMemo } from "react";
import { Character } from "../../../../modules/character/character.types";
import { CharacterForm } from "../CharacterForm/CharacterForm";

export const CharacterModal = ({
  characterId,
  isModalOpen,
  setIsModalOpen,
  mode = "view",
  filters,
  currentPage,
  query,
}: {
  isModalOpen: boolean;
  characterId: string;
  setIsModalOpen: (value: boolean) => void;
  mode?: "view" | "edit";
  filters: Partial<Character>;
  currentPage: number;
  query: string;
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
        filters={filters}
        currentPage={currentPage}
        query={query}
      />
    </Modal>
  );
};

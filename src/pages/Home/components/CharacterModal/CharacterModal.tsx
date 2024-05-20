import Modal from 'antd/es/modal/Modal';
import { useMemo } from 'react';
import { CharacterFormMode } from '../../../../modules/character/character.constants';
import { Character } from '../../../../modules/character/character.types';
import { CharacterForm } from '../CharacterForm/CharacterForm';

export const CharacterModal = ({
  characterId,
  isModalOpen,
  setIsModalOpen,
  mode = CharacterFormMode.VIEW,
  filters,
  currentPage,
  query,
}: {
  isModalOpen: boolean;
  characterId: string;
  setIsModalOpen: (value: boolean) => void;
  mode?: CharacterFormMode;
  filters: Partial<Character>;
  currentPage: number;
  query: string;
}) => {
  const title = useMemo(() => {
    if (mode === CharacterFormMode.VIEW) {
      return 'Character Info';
    }
    return 'Edit Character';
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

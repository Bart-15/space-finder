'use client';
import dynamic from 'next/dynamic';

const DynamicAddSpaceDialog = dynamic(() => import('./AddSpaceDialog'));

const SpacesContainer = () => {
  return <DynamicAddSpaceDialog />;
};

export default SpacesContainer;

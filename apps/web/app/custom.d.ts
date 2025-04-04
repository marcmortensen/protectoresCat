declare module "*.xml" {
  const content: {
    svg: {
      g: { path: { $: { id: string; d: string } }[] }[];
      $: { width?: number; height?: number; viewBox?: string };
    };
  };
  export default content;
}

import metaData from "~/assets/meta/data.json";
export const useLoadMeta = (path: string, metaOption: Array<any> = []) => {
  const loadMeta = computed(() => {
    const meta = metaData.find((item) => item.page === path);
    return [...meta!.meta, ...metaOption];
  });
  return loadMeta.value;
};

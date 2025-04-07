import type { FlatConfigItem } from './options';

export interface Addon<AddonOptions extends object | undefined = undefined> {
  name: string;
  entry: (opt?: AddonOptions) => FlatConfigItem[];
  /**
   * Additional dependencies required for this addon.
   *
   * Can be a list of necessary addons, or a function that accepts enabled
   * components and returns whether this addon can be enabled.
   */
  dependencies?: string[] | ((addons: string[]) => boolean);
}

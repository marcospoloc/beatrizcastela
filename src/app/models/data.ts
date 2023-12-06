import { CodeWidgetComponent } from '../components/widgets/code-widget/code-widget.component';
import { SpaceWidgetComponent } from '../components/widgets/space-widget/space-widget.component';
import { TextWidgetComponent } from '../components/widgets/text-widget/text-widget.component';
import { ImageWidgetComponent } from './../components/widgets/image-widget/image-widget.component';
import { MediaVideoFrameComponent } from '../components/widgets/media-frame/media-video-frame.component';
import { MediaUrlFrameComponent } from '../components/widgets/media-frame/media-url-frame.component';
import { MediaImageFrameComponent } from '../components/widgets/media-frame/media-image-frame.component';

export type GenericRow =
  | (Text)
  | (Images)
  | (Image)
  | (Space);

export interface CustomStringInterface {
  text?: string;
  style?: string;
  classes?: string[];
  styles?: { [klass: string]: any } | undefined;
}

export interface ImageInterface {
  image: string;
  component: any;
  width?: string;
  styles?: { [klass: string]: any } | undefined;
}

export interface RowInterface {
  component: any;
  class?: string;
  styles?: { [klass: string]: any } | undefined;
}

export interface RowCodeInterface extends RowInterface {
  code?: string;
}

export interface RowTextInterface extends RowInterface {
  title?: CustomString;
  subtitle?: CustomString;
  technique?: CustomString;
  location?: CustomString;
  text?: CustomString;
  cv_title?: CustomString;
  cv_text?: string[];
  paragraph?: string[];
  align?: string;
}

export interface RowSpaceInterface extends RowInterface {
  space?: string;
}

export interface RowImageInterface extends RowInterface {
  image: string;
  picture: ImageInterface
}

export interface RowImagesInterface extends RowInterface {
  images: ImageInterface[];
  image?: string;
  margin?: string;
  styles?: { [klass: string]: any } | undefined;
}

export interface MenuItemInterface {
  name: string;
  link: string;
  folder: string;
  visible: boolean;
  file: any;
}

export class CustomString implements CustomStringInterface {
  text?: string;
  style?: string;
  classes?: string[];
  styles?: { [klass: string]: any } | undefined;
  constructor({ text, style, styles,classes }:
    { text?: string, style?:string, styles?: { [klass: string]: any }, classes?: string[] }) {
    if (text) this.text = text;
    if (style) this.style = style;
    if (styles) this.styles = styles;
    if (classes) this.classes = classes;
  }
}

export class MenuItem implements MenuItemInterface {
  name: string;
  link: string;
  folder: string;
  image: ImageInterface;
  visible: boolean;
  file: any;
  constructor({ name, link, folder, visible, file, image }:
    { name: string, link?: string, folder?: string, visible?: boolean, file?: any, image?: string }) {
    this.name = name ?? '';
    this.link = (link ?? this.name);
    const folderName = folder ?? this.name;
    this.folder = '/assets/images/' + folderName + '/';
    this.visible = visible ?? true;
    this.file = file ?? '';
    this.image = new Picture({ image: image ?? '' });
  }
}

export class Space implements RowSpaceInterface {
  component: any = SpaceWidgetComponent;
  space?: string;
  constructor({ space = '0.5' }: { space?: string }) {
    this.space = (space + 'rem');
  }
}

export class Text implements RowTextInterface {

  component: any;
  title?: CustomString | undefined;
  subtitle?: CustomString | undefined;
  text?: CustomString | undefined;
  paragraph?: string[] | undefined;
  technique?: CustomString | undefined;
  location?: CustomString | undefined;
  cv_title?: CustomString | undefined;
  cv_text?: string[] | undefined;
  align?: string | undefined;
  class?: string | undefined;
  classes?: string[] | undefined;

  constructor({ title, subtitle, text, technique, location, cv_title, cv_text,
    align, paragraph, clase = 'normal',classes }: {
      title?: string | CustomString, subtitle?: string | CustomString, technique?: string | CustomString,
      location?: string | CustomString, cv_title?: string | CustomString, cv_text?: string[], text?: string | CustomString,
      align?: string, paragraph?: string[], clase?: string,classes?:string[]
    }) {
    this.component = TextWidgetComponent;
    this.title = this.parseString(title);
    this.subtitle = this.parseString(subtitle);
    this.text = this.parseString(text);
    this.technique = this.parseString(technique);
    this.location = this.parseString(location);
    this.cv_title = this.parseString(cv_title);
    if (cv_text) this.cv_text = cv_text;
    if (paragraph) this.paragraph = paragraph;
    this.align = align ?? 'left';
    this.class = ('texto-' + clase);
    this.classes = [this.class];
    if(classes)this.classes.concat(classes);
  }

  parseString(data?: string | CustomString): CustomString | undefined {
    if (data) {
      const { text = '',style = '', styles = undefined, classes = undefined } = (typeof data === 'string') ? { text: data } : data;

      return new CustomString({ text, style, styles, classes });
    }
    return undefined;
  }

}

export class Picture implements ImageInterface {
  image: string;
  width: string;
  component: any = MediaImageFrameComponent;
  styles?: { [klass: string]: any } | undefined;
  constructor({ image, width }: { image: string, width?: string }) {
    this.image = image;
    this.width = width ?? '100%';
    if (image.endsWith('.mp4')) {
      this.component = MediaVideoFrameComponent;
    } else if (image.startsWith('http')) {
      this.component = MediaUrlFrameComponent;
    }
  }
}

class RowImagesImplement implements RowImagesInterface {
  images: ImageInterface[] = [];
  margin?: string | undefined = '0rem';
  class?: string | undefined = 'images-flex';
  styles?: { [klass: string]: any } | undefined;
  component: any = ImageWidgetComponent;
  constructor() { }
  addImages({ imageArray, defaultWidth }:
    { imageArray: { image: string, width?: string | undefined }[] | undefined, defaultWidth: string }) {
    if (!imageArray) return;
    imageArray.forEach(item => {
      this.images?.push(
        new Picture({ image: item.image, width: (item.width ?? defaultWidth) })
      )
    });
  }
}

export class Image extends RowImagesImplement {
  constructor({ image }: { image?: string }) {
    super();
    this.images = image ? [new Picture({ image: image, width: '100%' })] : [];
  }
}

export class Images extends RowImagesImplement {
  constructor({ images, margin = '0.5' }: { images?: { image: string, width?: string }[], margin?: string }) {
    super();
    this.margin = (margin + 'rem');
    this.addImages({ imageArray: images, defaultWidth: '100%' });
    this.setImagesStyles();
  }

  setImagesStyles() {
    if (this.images.length < 0) return;
    const firstBig = (this.images[0].width != '0');
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].styles = {
        'flex-basis': this.images[i].width,
        'margin-left': i == 0 ? '0rem' : this.margin
      };
    }
  }
}

export class Mosaic extends RowImagesImplement {
  constructor({ images, margin = '0.5' }: { images?: { image: string, width?: string }[], margin?: string }) {
    super();
    this.class = 'images-grid';
    this.margin = (margin + 'rem');
    this.addImages({ imageArray: images, defaultWidth: '0' });
    this.setImagesStyles();
    this.styles = {
      'grid-column':'span 1 / span 1',
      'grid-template-columns': this.getColsTemplate(),
      'gap':this.margin}
  }

  setImagesStyles() {
    if (this.images.length < 0) return;
    let fb1: string = (this.images[0].width != '0') ? '1' : '2';
    let fb2: string = (fb1 == '1') ? '2' : '1';
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].styles = {
        'grid-area': (i == 0) ? `1 / 1 / span ${fb2} / span 1` :
          (i == 1) ? `${fb1} / ${fb2}  / span 1 / span 1` :
            `${fb2} / 2 / span ${fb1} / span 1`
      };
    }
  }

  getColsTemplate() {
    const w1 = this.images[0].width;
    if(w1 != '0')return w1+' 1fr';
    else{
      const w2 = this.images[1].width;
      const w3 = this.images[2].width;
      const wf = (w2!='0')?w2:w3;
      return '1fr '+ wf;
    }
  }
}

export class Code implements RowCodeInterface {
  component: any = CodeWidgetComponent;
  class?: string | undefined;
  code: string;
  constructor({ code }: { code: string }) {
    this.code = code;
  }
}

export const DataType = Symbol();

interface DefaultExtension {
  operators: {
    equals(lvalue: any, other: any): boolean;
    above(lvalue: any, other: any): boolean;
    below(lvalue: any, other: any): boolean;
    between(lvalue: any, lower: any, upper: any): boolean;
  }
}

interface DateExtension {
  operators: {
    before (lvalue: Date, other: Date): boolean
    after (lvalue: Date, other: Date): boolean
  }
  operatorTypes: {
    before: {
      Date: Date
    }
    after: {
      Date: Date
    }
  }
  operatorBlackLists: {
    above: {
      Date: Date
    }
    below: {
      Date: Date
    }
  }
}

export interface DateRange {
  [DataType]?: "DateRange";
  from: Date;
  to: Date;
}

interface DateRangeExtension {
  operators: {
    overlapsWith (lvalue: DateRange, other: DateRange): boolean;
  };
  operatorTypes: {
    overlapsWith: DateRange;
  }
}

export interface Image extends ArrayBuffer {
  [DataType]?: "Image";
}

interface ImageExtension {
  operators: {
    represents (lvalue: Image, tag: string): boolean;
  },
  operatorTypes: {
    represents: Image;
  },
  operatorBlackLists: {}
}

//var x: DateRangeExtension & ImageExtension;

class ImageExtension {
  operators = {
    represents (lvalue: Image, tag: string) {
      return lvalue ? false : true;
    } 
  }
}

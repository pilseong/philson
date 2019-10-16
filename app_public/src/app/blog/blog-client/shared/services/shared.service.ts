import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/shared/types/article';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // private emitChangeSource = new Subject<any>()
  private activeCategory: Category
  private categories: Category[] = []
  private mode: string = "read"

  // changeEmitted$ = this.emitChangeSource.asObservable()
  
  // emitChange(change: any) {
  //   console.log('emitchange')
  //   this.emitChangeSource.next(change)
  // }
  
  setMode(mode: string) {
    this.mode = mode
  }

  getMode(): string {
    return this.mode;
  }

  // set the active category
  setActiveCategory(categoryId: string): Category {
    this.categories.forEach(item=> {
      if (item.children !== undefined)
        item.children.forEach(children=>{
          if (categoryId === children._id) {
            console.log(categoryId + " " + item._id)
            this.activeCategory = item
          }
        })
      })
    return this.activeCategory
  }

  getActiveCategory(): Category {
    return this.activeCategory
  }

  getCategoryName(categoryId): string {
    const category: Category = this.getActiveCategory()
    return this.activeCategory.name
  }

  getCategory(categoryid): Category {
    let result: Category
    this.categories.forEach(item=> {
      if (item._id === categoryid) {
        result = item;
      } else {
        if (item.children !== undefined) {
          item.children.forEach(child=>{
            if (child._id === categoryid) {
              result = child;
            }
          })
        }
      }
    })
    return result;
  }

  getCategories(categoryId): Category[] {
    return this.categories
  }

  setCategories(categories: Category[]) {
    this.categories = categories
  }

  constructor() { }
}
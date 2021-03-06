// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OnChanges, TypedChanges } from '../../../declarations/angular/typed-changes';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';
import { ChangeableItemHelper } from './changeable-helper';

/**
 * Parent class for wrapper directive for single item with OnChanges
 */
export abstract class ChangeableItemDirective<TItem> implements OnChanges<ChangeableItemDirective<TItem>>, OnInit {
  @Input() key: string;

  @Output()
  get onItemChanged(): EventEmitter<ItemChangedPayload<string, TItem>> {
    return this.changeableItemHelper && this.changeableItemHelper.onItemChanged;
  }

  private changeableItemHelper: ChangeableItemHelper<TItem>;

  ngOnInit() {
    this.changeableItemHelper = new ChangeableItemHelper(this.key);
  }

  ngOnChanges(changes: TypedChanges<TItem>) {
    if (this.changeableItemHelper) {
      this.changeableItemHelper.emitChanges(changes);
    }
  }
}

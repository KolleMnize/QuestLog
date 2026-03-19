import { describe, it, expect, test } from 'vitest'
import { StructureNodeModel } from './structure-node.model'

describe('StructureNodeModel.constructor', () => {
  it('creates a structure node with the correct ID', () => {
    // Arrange 
    const node = new StructureNodeModel(1, 'Test Node')
    // Assert
    expect(node.Id).toBe(1)
  })

  it('creates a structure node with the correct name', () => {
    // Arrange
    const node = new StructureNodeModel(1, 'Test Node')
    // Assert
    expect(node.name).toBe('Test Node')
  })

  it('initializes children as an empty array', () => {
    // Arrange
    const node = new StructureNodeModel(1, 'Test Node')
    // Assert
    expect(node.children).toEqual([])
  })

  it('initializes isActive to true', () => {
    // Arrange
    const node = new StructureNodeModel(1, 'Test Node')
    // Assert
    expect(node.isActive).toBe(true)
  })
})

describe('StructureNodeModel.addChild', () => {
  it('should add the child to the children array and set the parent reference of the child', () => {
    // Arrange 
    const parent = new StructureNodeModel(1, 'parent'); const child = new StructureNodeModel(2, 'child');
    // Act 
    parent.addChild(child);
    // Assert 
    expect(parent.children.length).toBe(1);
    expect(parent.children[0]).toBe(child);
    expect(child.Parent).toBe(parent);
  });

  it('should support adding multiple children', () => {
    const parent = new StructureNodeModel(1, 'parent');
    const child1 = new StructureNodeModel(2, 'child1');
    const child2 = new StructureNodeModel(3, 'child2');
    parent.addChild(child1); parent.addChild(child2);
    expect(parent.children).toEqual([child1, child2]);
    expect(child1.Parent).toBe(parent);
    expect(child2.Parent).toBe(parent);
  });
});
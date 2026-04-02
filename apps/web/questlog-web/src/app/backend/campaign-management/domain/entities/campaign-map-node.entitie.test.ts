import { describe, it, expect, test } from 'vitest'
import { CampaignMapNode } from './campain-map-node.entitie'

describe('StructureNodeModel.constructor', () => {
  it('creates a structure node with the correct ID', () => {
    // Arrange 
    const node = new CampaignMapNode(1, 'Test Node')
    // Assert
    expect(node.Id).toBe(1)
  })

  it('creates a structure node with the correct name', () => {
    // Arrange
    const node = new CampaignMapNode(1, 'Test Node')
    // Assert
    expect(node.Name).toBe('Test Node')
  })

  it('initializes children as an empty array', () => {
    // Arrange
    const node = new CampaignMapNode(1, 'Test Node')
    // Assert
    expect(node.children).toEqual([])
  })

  it('initializes isActive to true', () => {
    // Arrange
    const node = new CampaignMapNode(1, 'Test Node')
    // Assert
    expect(node.isActive).toBe(true)
  })
})

describe('StructureNodeModel.addChild', () => {
  it('should add the child to the children array and set the parent reference of the child', () => {
    // Arrange 
    const parent = new CampaignMapNode(1, 'parent'); const child = new CampaignMapNode(2, 'child');
    // Act 
    parent.addChild(child);
    // Assert 
    expect(parent.children.length).toBe(1);
    expect(parent.children[0]).toBe(child);
    expect(child.Parent).toBe(parent);
  });

  it('should support adding multiple children', () => {
    const parent = new CampaignMapNode(1, 'parent');
    const child1 = new CampaignMapNode(2, 'child1');
    const child2 = new CampaignMapNode(3, 'child2');
    parent.addChild(child1); parent.addChild(child2);
    expect(parent.children).toEqual([child1, child2]);
    expect(child1.Parent).toBe(parent);
    expect(child2.Parent).toBe(parent);
  });
});